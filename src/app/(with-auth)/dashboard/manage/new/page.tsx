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
import { createUserSchema } from "@/validations/schema";
import { useFormik } from "formik";
import React from "react";

function Page() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      matricNo: "",
      role: "",
      // department and profile pic
    },
    validationSchema: createUserSchema,
    onSubmit: (values) => {},
  });
  return (
    <div>
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
              <Label htmlFor="picture">First Name</Label>
              <Input className="h-12" placeholder="Original" />
            </div>
            <div className="">
              <Label htmlFor="picture">Last Name</Label>
              <Input className="h-12" placeholder="Timi" />
            </div>
            <div className="">
              <Label htmlFor="picture">Email</Label>
              <Input className="h-12" placeholder="example@gmail.com" />
            </div>
            <div className="">
              <Label htmlFor="picture">Matric No</Label>
              <Input className="h-12" placeholder="0000/000/000" />
            </div>
            <div className="">
              <Label htmlFor="picture">Profile Pic</Label>
              <Input className="h-12" type="file" placeholder="0000/000/000" />
            </div>
            <div className="">
              <Label htmlFor="picture">Role</Label>
              <Select>
                <SelectTrigger className="w-[180px] h-12">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="apple">Admin</SelectItem>
                    <SelectItem value="banana">Lectuerer</SelectItem>
                    <SelectItem value="blueberry">Student</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
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
            </div>
          </div>

          <Button className="my-5 w-full h-12">Create User</Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
