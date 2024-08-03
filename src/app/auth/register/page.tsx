"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { FaSpinner, FaCamera as ScanIcon } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { loginSchema } from "@/validations/schema";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { startRegistration } from "@simplewebauthn/browser";

/*******
  Register Request Body Type
*******/
type RegisterT = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};
type VerifyRegisterT = {
	response: any;
};
const register = ({ email, password, firstName, lastName }: RegisterT) => {
	return API.post("/api/auth/register", {
		email,
		password,
		firstName,
		lastName,
	});
};

const verifyRegister = ({ response }: VerifyRegisterT) => {
	return API.post("/api/auth/register/verify", { response });
};

/*******
  REGISTER PAGE
*******/

function Page() {
	const { fetchData, loading, data, error } = useFetch<RegisterT, any>(
		register
	);
	const router = useRouter();
	const query = useSearchParams();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
		validationSchema: loginSchema,
		async onSubmit(values) {
			await fetchData(values);
		},
	});

	const {
		fetchData: verifyReg,
		loading: verifing,
		error: failed,
		data: verifiedData,
	} = useFetch<any, any>(verifyRegister);
	const verified = useRef(false);
	useEffect(() => {
		formik.validateForm();

		if (data && !error && !loading) {
			const startAuth = async () => {
				try {
					const options = {
						...data.options,
						authenticatorAttachment: "platform",
						userVerification: "required",
					};
					const authResp = await startRegistration(options);
					verifyReg({ response: authResp });
				} catch (error) {
					alert("Verification Failed");
				}
			};
			startAuth();
		}
	}, [query, data, error]);

	useEffect(() => {
		if (verifiedData && !failed && !verifing && !verified.current) {
			const continueUrl = query.get("next");
			const v = (verified.current = verifiedData.data.verified);
			console.log(v);
			if (!v) {
				alert("Verified Failed");
				return;
			}
			// verified.current = true;
			router.replace(continueUrl || `/dashboard`);
		}
	}, [verifiedData]);
	return (
		<div className="p-12 shadow-md rounded-md max-w-[500px] mx-auto">
			<img src="/logo.svg" alt="Logo" className="size-[100px]" />
			<div className="pb-4">
				<h3 className="text-3xl py-2 font-bold">Register</h3>
				<p className="text-sm">
					Already have an account?{" "}
					<a href="maillto:admin@school.com" className="font-bold">
						Contact the School Officer
					</a>
				</p>
			</div>

			<div className="my-2">
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
					<div className="">
						<Input
							value={formik.values.email}
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="originalTimi"
							className="h-[50px] text-sm"
							type="email"
						/>
					</div>
					<div className="">
						<Input
							value={formik.values.firstName}
							name="firstName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="originalTimi"
							className="h-[50px] text-sm"
							type="firstName"
						/>
					</div>
					<div className="">
						<Input
							value={formik.values.lastName}
							name="lastName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="originalTimi"
							className="h-[50px] text-sm"
							type="lastName"
						/>
					</div>
					<div className="">
						<Input
							name="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="h-[50px] text-sm"
							placeholder="password"
							type="password"
						/>
					</div>
					<div className="min-h-4">
						{error && <p className="text-xs text-red-500">{error}</p>}
						{data && <p className="text-xs text-green-500">{data.msg}</p>}
					</div>
					<div className="flex flex-col gap-3">
						<p className="font-semibold text-sm underline">
							Forgotten Password?
						</p>
						<Button
							disabled={!formik.isValid}
							type="submit"
							className="text-xs py-6 bg-primary-color"
						>
							{loading ? (
								<FaSpinner className="animate-spin" />
							) : (
								<span> Register </span>
							)}
						</Button>
						<Button
							type="button"
							className="text-xs justify-center items-center gap-2 flex py-6"
						>
							<ScanIcon />
							<span>Scan your ID</span>
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Page;
