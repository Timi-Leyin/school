"use client";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaGlobeAfrica,
  FaImage,
  FaLock,
  FaPlus,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { Add, People } from "iconsax-react";
import { Field, FieldArray, useFormik } from "formik";
import { createVoteSchema } from "@/validations/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFetch } from "@/hooks/use-fetch";
import { API } from "@/config/api";
import { newVoteType } from "@/types/global";
import { useRouter } from "next/navigation";

const newVote = async (values: newVoteType) => {
  return API.post("/api/votes", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

function Page() {
  const router = useRouter();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const increaseOption = () => {
    formik.setFieldValue("options", [
      ...formik.values.options,
      {
        text: "",
      },
    ]);
  };

  const removeOption = (index: number) => {
    const newOptions = formik.values.options.filter((_, i) => i !== index);
    formik.setFieldValue("options", newOptions);
  };

  const d = new Date();
  const tommorrow = d.setDate(d.getDate() + 1); // get todays day and add one
  const [visibility, setVisibility] = useState("public");
  const { data, loading, error, fetchData: createNewVote } = useFetch(newVote);
  const [whoCanVote, setWhoCanVote] = useState("everyone");
  const initialPreview = "/thumb.avif";
  const [previewThumbnail, setPreview] = useState(initialPreview);

  const resetPreview = () => {
    setPreview(initialPreview);
  };
  // const [overallValid, setOverallValidation] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: new Date().toISOString(),
      endDate: new Date(tommorrow).toISOString(),
      visibility,
      whoCanVote,
      options: [],
    },
    validationSchema: createVoteSchema,
    async onSubmit(values) {
      if (!formRef.current) {
        return;
      }
      const fd = new FormData(formRef.current);
      // fd.append("title", values.title);
      // fd.append("startDate", values.startDate);
      // fd.append("endDate", values.endDate);
      // fd.append("visibility", values.visibility);
      // fd.append("whoCanVote", values.whoCanVote);
      // fd.append("options", JSON.stringify(values.options));
      await createNewVote(fd);
      fd.forEach((va)=> console.log(va))
    },
  });
  useEffect(()=>{
    // @ts-ignore
    if(!error && !loading && data && !data.data){
      router.push("/dashboard");
    }
  },[data, loading, error,])

  const openDatePicker = (ref: RefObject<HTMLInputElement>) => {
    if (!ref.current) {
      return;
    }

    ref.current.showPicker();
  };

  const showErrorToast = () => {
    if (Object.keys(formik.errors).length > 0) {
      const error =
        formik.errors.title ||
        formik.errors.visibility ||
        formik.errors.endDate ||
        formik.errors.startDate ||
        formik.errors.whoCanVote;
      toast(error, {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={formik.handleSubmit}
      className="my-8 flex max-w-[900px] mx-auto p-12 justify-between"
    >
      <div className="">
        <div className="relative rounded-xl overflow-hidden border w-max h-max">
          <Image src={previewThumbnail} alt={""} width={350} height={350} />
          <div className="rounded-full bg-gray-200 absolute bottom-0 m-3 flex justify-center items-center cursor-pointer hover:opacity-70 transition-colors backdrop-blur-md size-12">
            <FaImage />
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files);
                if (e.target.files) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setPreview(url);
                }
              }}
              name="thumbnail"
              className="opacity-0 absolute"
            />
          </div>

          {previewThumbnail == initialPreview ? undefined : (
            <div
              onClick={() => resetPreview()}
              className="rounded-full right-0 bg-red-200 absolute bottom-0 m-3 flex justify-center items-center cursor-pointer hover:opacity-70 transition-colors backdrop-blur-md size-12"
            >
              <FaTimes />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 px-9">
        <div className="flex gap-5 justify-between">
          <Select
            onValueChange={(e) => setWhoCanVote(e)}
            defaultValue="everyone"
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Who can Vote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">
                <div className="flex gap-2 items-center">
                  <People size={18} className="opacity-50" /> Everyone
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(e) => {
              setVisibility(e);
            }}
            defaultValue="public"
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex gap-2 items-center">
                  <FaGlobeAfrica className="opacity-50" /> Public
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex gap-2 items-center">
                  <FaLock className="opacity-50" /> Private
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="my-4">
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-5xl font-bold bg-transparent outline-none border-none"
            placeholder="Vote Title"
          />
          <p className="text-xs text-red-500 capitalize font-bold">
            {formik.errors.title}
          </p>
        </div>
        <div className="">
          <div className="bg-gray-50 justify-between flex rounded-xl p-6">
            <div className="">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-[15px] h-[15px] bg-gray-200 rounded-full"></div>
                  <div className="h-[40px] border-dashed border-l rounded-full"></div>
                </div>
                <p className="text-xs font-bold">Start</p>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-[15px] border-dashed border-l rounded-full"></div>
                  <div className="w-[15px] h-[15px] bg-gray-200 rounded-full"></div>
                </div>
                <p className="text-xs self-end font-bold">End</p>
              </div>
            </div>
            <div className="flex relative flex-col gap-5">
              <div
                onClick={() => openDatePicker(startDateRef)}
                className="bg-gray-300/70 rounded-lg relative cursor-pointer w-full "
              >
                <p className="p-3 text-xs font-bold">
                  {new Date(formik.values.startDate).toUTCString()}
                </p>
                <input
                  ref={startDateRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="startDate"
                  // value={formik.values.endDate}
                  type="datetime-local"
                  className="opacity-0 select-none invisible absolute"
                />
              </div>
              <div
                onClick={() => openDatePicker(endDateRef)}
                className="bg-gray-300/70 rounded-lg cursor-pointer w-[300px]"
              >
                <p className="p-3 text-xs font-bold">
                  {new Date(formik.values.endDate).toUTCString()}
                </p>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="endDate"
                  ref={endDateRef}
                  className="opacity-0 select-none invisible absolute"
                  type="datetime-local"
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <Tabs defaultValue="custom">
              <TabsList>
                <TabsTrigger value="custom">
                  <div className="flex text-xs gap-2 items-center">
                    <Add size={18} className="opacity-50" /> Custom Options
                  </div>
                </TabsTrigger>
                <TabsTrigger value="users">
                  <div className="text-xs flex gap-2 items-center">
                    <People size={18} className="opacity-50" /> Choose Users
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="custom">
                <div className="bg-gray-50 w-full p-4">
                  {formik.values.options.length === 0 ? (
                    <p className="text-xs p-4 text-center">No Options Added</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {formik.values.options.map((option: any, index) => (
                        <div key={index}>
                          <div className="my-3 flex option-content items-center justify-center gap-1">
                            <Input
                              onChange={formik.handleChange}
                              name={`options[${index}].text`}
                              placeholder={`Option ${index + 1}`}
                              className="text-xs"
                              value={option.text}
                            />
                            <div
                              onClick={() => removeOption(index)}
                              className="close transition-opacity size-8 flex-shrink-0 cursor-pointer rounded-full flex justify-center items-center bg-gray-200"
                            >
                              <FaTimes size={"12px"} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={increaseOption}
                    type="button"
                    className="mx-auto text-xs my-2 flex items-center gap-1"
                  >
                    <Add size={18} /> Insert New Option
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="users">
                <div className="bg-gray-50 w-full p-4">...</div>
              </TabsContent>
            </Tabs>

            {formik.errors.options && (
              <p className="text-xs text-red-500">
                All Options Must be Filled
                {/* @ts-ignore */}
                {/* {formik.errors.options[index].text} */}
              </p>
            )}
            <Button
              disabled={!formik.isValid || loading}
              onClick={() => {
                showErrorToast();
              }}
              type="submit"
              className="my-3 text-xs w-full h-12 bg-red-400"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <span>Create Vote</span>
              )}
            </Button>
          </div>
          {/* 
          <div className="my-5">
            <Select>
              <SelectTrigger className="text-xs w-[160px]">
                <SelectValue placeholder="Vote Options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">
                  <div className="flex text-xs gap-2 items-center">
                    <Add size={18} className="opacity-50" /> Custom Options
                  </div>
                </SelectItem>
                <SelectItem value="users">
                  <div className="text-xs flex gap-2 items-center">
                    <People size={18} className="opacity-50" /> Choose Users
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="bg-gray-50 flex my-2 h-[400px] rounded-xl p-5"></div>
          </div> */}
        </div>
      </div>
    </form>
  );
}

export default Page;
