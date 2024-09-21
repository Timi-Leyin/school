"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from "@/components/ui/select";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { createUserSchema } from "@/validations/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const createUser = (values: any) => {
	return API.post("/api/admin/create-user", values);
};

function Page() {
	const { data, error, fetchData, loading } = useFetch(createUser);
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			matricNo: "",
			role: "",
			password: "",
			// department and profile pic
		},
		validationSchema: createUserSchema,
		onSubmit: (values) => {
      fetchData(values);
		},
	});

	useEffect(() => {
    console.log(error)
		if (data && !loading && !error)
			router.replace("/dashboard/manage/students");

		if (error && !loading) {
			alert(error);
		}
	}, [loading, error, data]);
	return (
		<div className="max-w-[600px] mx-auto p-6">
			<div className="py-4">
				<h2 className="text-4xl">Create New User</h2>
				<p className="text-sm py-1">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis,
					explicabo.
				</p>
			</div>

			<div className="">
				<form onSubmit={formik.handleSubmit} className="">
					<div className="grid gap-x-12 gap-y-6  grid-cols-3">
						<div className="">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								name="firstName"
								value={formik.values.firstName}
								onChange={formik.handleChange}
								className="h-12"
								placeholder="Original"
							/>
						</div>
						<div className="">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								name="lastName"
								value={formik.values.lastName}
								onChange={formik.handleChange}
								className="h-12"
								placeholder="Timi"
							/>
						</div>
						<div className="">
							<Label htmlFor="email">Email</Label>
							<Input
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								className="h-12"
								placeholder="example@gmail.com"
							/>
						</div>
						<div className="">
							<Label htmlFor="matricNo">Matric No</Label>
							<Input
								name="matricNo"
								value={formik.values.matricNo}
								onChange={formik.handleChange}
								className="h-12"
								placeholder="0000/000/000"
							/>
						</div>
						{/* <div className="">
              <Label htmlFor="picture">Profile Pic</Label>
              <Input className="h-12" type="file" placeholder="0000/000/000" />
            </div> */}

						<div className="">
							<Label htmlFor="password">Password</Label>
							<Input
								name="password"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								className="h-12"
								placeholder="*********88"
							/>
						</div>

						<div className="">
							<Label htmlFor="role">Role</Label>
							<Select
								name="role"
								value={formik.values.role}
								onValueChange={(value) => {
									formik.setFieldValue("role", value);
								}}
							>
								<SelectTrigger className="w-[180px] h-12">
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Role</SelectLabel>
										<SelectItem value="ADMIN">Admin</SelectItem>
										<SelectItem value="LECTURER">Lectuerer</SelectItem>
										<SelectItem value="STUDENT">Student</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						{/* <div className="">
              <Label htmlFor="picture">Department</Label>
              <Select>
                <SelectTrigger className="w-max h-12">
                  <SelectValue placeholder="Select/create Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
					</div>

					<Button type="submit" disabled={loading} className="my-5 w-full h-12">
						{loading?"loading..." :"Create User"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Page;
