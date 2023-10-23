// @ts-nocheck
import React, { useState } from "react";
import Image from "next/image";
import ClassmateButton from "../../components/ClassmateButton";
import { useRouter } from "next/router";
import axios from "axios";

const icons: Record<string, string> = {
	logo: "/classmate-logo-solid.svg",
	swinging: "/swinging.svg",
	reading: "/reading.svg",
	globe: "/globe.svg",
	book: "/book.svg",
	atom: "/atom.svg",
	plane: "/plane.svg",
};

const Hero = (): JSX.Element => {
	const router = useRouter();
	const [numUsers, setNumUsers] = useState();

	const handlerUsersClick = async () => {
		try {
			const res = await axios.get("/dev/usercount");
			setNumUsers(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="section-padding relative z-0 flex h-screen min-h-[700px] w-full items-center justify-center bg-classmate-tan-1">
			<Image
				src={icons.swinging}
				width={0}
				height={0}
				className="pointer-events-none absolute left-0 top-0 h-48 w-auto lg:h-64 2xl:h-96 "
				alt={"An illustration of a person happily swinging on a swing"}
			/>
			<Image
				src={icons.reading}
				width={0}
				height={0}
				className="pointer-events-none absolute bottom-0 right-0 h-48 w-auto lg:h-64 2xl:h-80"
				alt="An illustration of a person engrossed in a book, reading with focused attention."
				priority
			/>

			<div className="relative z-10 flex flex-col items-center">
				<Image
					src={icons.globe}
					width={0}
					height={0}
					className="2xl:h-58 pointer-events-none absolute -bottom-[140px] -left-16 hidden h-36 w-auto xs:block sm:-bottom-[120px] sm:-left-16 md:-bottom-[140px] md:-left-24 md:h-40 lg:-bottom-[160px] lg:-left-56 lg:h-48 2xl:-left-64 2xl:h-56"
					alt="An illustration of a globe, representing the Earth."
				/>
				<Image
					src={icons.book}
					width={0}
					height={0}
					className="pointer-events-none absolute  -right-16 -top-[140px] hidden h-20 w-auto xs:block sm:-right-16 sm:-top-[120px] md:-right-24 md:-top-[140px] md:h-24 lg:-right-56 lg:-top-[160px] lg:h-28 2xl:-right-64 2xl:h-32"
					alt="An illustration of an open book with blank pages."
				/>
				<Image
					src={icons.atom}
					width={0}
					height={0}
					className="pointer-events-none absolute -top-36 mr-[315px] hidden h-24 w-auto xl:block 2xl:-top-48"
					alt="An illustration of a neutron, a subatomic particle found in the nucleus of an atom."
				/>
				<Image
					src={icons.plane}
					width={0}
					height={0}
					className="absolute -bottom-[150px] ml-[350px] hidden h-44 w-fit xl:flex"
					alt="An illustration of a paper airplane, a folded paper object resembling an airplane shape."
				/>
				<h1 className="font-classmate mb-10 text-6xl">{numUsers}</h1>
				<ClassmateButton
					size="lg"
					variant="filled"
					callback={handlerUsersClick}
					styles="bg-classmate-green-4 text-classmate-tan-1 z-40">
					See Number of Registered Users
				</ClassmateButton>
			</div>
		</section>
	);
};

export default Hero;
