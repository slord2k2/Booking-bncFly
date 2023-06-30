import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

function PlacePage() {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then((response) => {
			setPlace(response.data);
		});
	}, [id]);
	if (!place) {
		return "";
	}
	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 bg-white min-h-screen">
				<div className="p-8 grid gap-4">
					<div>
						<h2 className="font-semibold text-3xl mr-48">Photos of {place.title}</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-gray-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6"
							>
								<path
									fillRule="evenodd"
									d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
									clipRule="evenodd"
								/>
							</svg>
							Close Photos
						</button>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo, index) => (
							<div key={index}>
								<img
									src={"http://localhost:3000/uploads/" + photo}
									alt={photo}
								/>
							</div>
						))}
				</div>
			</div>
		);
	}
	return (
		<div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
			<h1 className="text-3xl">{place.title}</h1>
			<a
				className="flex gap-1 my-3 font-semibold underline"
				href={"https://maps.google.com/?q=" + place.address}
				target="_blank"
				rel="noreferrer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
						clipRule="evenodd"
					/>
				</svg>

				{place.address}
			</a>
			<div className="relative">
				<div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
					<div>
						{place.photos?.[0] && (
							<div className="">
								<img
									onClick={() => setShowAllPhotos(true)}
									className="aspect-square object-cover cursor-pointer"
									src={"http://localhost:3000/uploads/" + place.photos[0]}
									alt=""
								/>
							</div>
						)}
					</div>
					<div className="grid">
						{place.photos?.[1] && (
							<img
								onClick={() => setShowAllPhotos(true)}
								className="aspect-square object-cover cursor-pointer"
								src={"http://localhost:3000/uploads/" + place.photos[1]}
								alt=""
							/>
						)}
						<div className="overflow-hidden">
							{place.photos?.[2] && (
								<img
									onClick={() => setShowAllPhotos(true)}
									className="aspect-square object-cover cursor-pointer relative top-2"
									src={"http://localhost:3000/uploads/" + place.photos[2]}
									alt=""
								/>
							)}
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						setShowAllPhotos(true);
					}}
					className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-3xl shadow-md shadow-gray-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					Show more
				</button>
			</div>
			<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div className="font-semibold">
					<div className="my-4">
						<h2 className="font-bold text-2xl">Description</h2>
						{place.description}
					</div>
					Check-In: {place.checkIn}
					<br />
					Check-Out: {place.checkOut}
					<br />
					Max Guests: {place.maxGuest}
				</div>
				<div className="">
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="bg-white -mx-8 px-8 py-8 border-t">
				<div>
					<h2 className="font-bold text-2xl">Extra Info</h2>
				</div>
				<div className="my-4 mt-2 text-gray-700 leading-5 font-semibold text-md">
					{place.extraInfo}
				</div>
			</div>
		</div>
	);
}

export default PlacePage;
