import { NextResponse } from "next/server";

export default (err?:unknown) => {
  // console.log(JSON.stringify(err))
  return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
};
