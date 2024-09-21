import Link from "next/link";
import React from "react";

const LandingPage = () => {
	return (
		<div className="bg-black min-h-screen text-white font-sans">
			{/* Header */}
			<header className="container mx-auto p-6 max-w-[90vw] flex justify-between items-center">
				<div className="text-xl font-bold">VoteMaster</div>
				{/* <nav className="space-x-6">
          <a href="#features" className="hover:text-gray-400">Features</a>
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
        </nav> */}
				<div>
					<Link href="/auth/login">
						{" "}
						<button className="text-gray-400 mr-4">Log In</button>
					</Link>
					<Link href={"/auth/register"}>
						{" "}
						<button className="bg-white text-black font-semibold py-2 px-4 rounded-full">
							Sign Up
						</button>
					</Link>
				</div>
			</header>

			{/* Hero Section */}
			<section
				className="flex justify-center items-center relative bg-no-repeat bg-cover text-center py-20 min-h-[70vh]"
				style={{ backgroundImage: "url(/bg.jpg)" }}
			>
				<div className="container mx-auto px-6 max-w-[700px]">
					<h1 className="text-4xl md:text-6xl font-bold leading-tight">
						Secure Your Vote, Shape Your Future
					</h1>
					<p className="mt-4 text-lg md:text-xl text-gray-400">
						Experience a modern, secure, and transparent voting system that
						ensures every vote is counted.
					</p>
					<div className="mt-8">
						<Link href="/auth/login">
							<button className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 mr-4">
								Get started Now
							</button>
						</Link>
						<button className="border border-white text-white py-3 px-6 rounded-full hover:bg-white hover:text-black transition duration-300">
							Learn More
						</button>
					</div>
				</div>
			</section>

			{/* Platform Logos */}
			<section className="bg-black py-12">
				<div className="container mx-auto px-6 flex justify-center space-x-8">
					<img
						src="/schools.png"
						alt="Trusted Platform 1"
						className=""
						width={600}
					/>{" "}
				</div>
			</section>

			{/* Showcase Section */}
			<section className="bg-gray-900 py-20">
				<div className="container mx-auto px-6 text-center">
					<img
						src="/pc.png"
						alt="Voting System Screenshot"
						className="mx-auto shadow-lg rounded-lg w-[450px]"
					/>
				</div>
			</section>

			{/* Subtext Section */}
			<section className="bg-black py-20 text-center">
				<div className="container mx-auto px-6 text-gray-500 text-lg md:text-xl">
					Every vote matters. VoteMaster makes sure your voice is heard in every
					election.
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-400 py-6">
				<div className="container mx-auto px-6 text-center">
					<p className="text-sm">
						&copy; 2024 VoteMaster. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
