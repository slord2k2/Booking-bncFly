import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

function PlacesPage() {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState("");
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuest, setMaxGuest] = useState("");

	function inputHeader(text) {
		return <h2 className="text-2xl mt-4">{text}</h2>;
	}
	function inputDescription(text) {
		return <p className="text-gray-500 text-sm">{text}</p>;
	}
	function preInput(header, description) {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	}
	async function addPhotoByLink(ev){
		ev.preventDefault();
		const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
		// setAddedPhotos([...addedPhotos, filename]);
		setAddedPhotos(prev =>{
			return [...prev, filename]
		})
		setPhotoLink('');
	}

	return (
		<div>
			{action !== "new" && (
				<div className="text-center">
					<Link
						className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
						to={"/account/places/new"}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
								clipRule="evenodd"
							/>
						</svg>
						Add new place
					</Link>
				</div>
			)}
			{action === "new" && (
				<div>
					<form action="">
						{preInput(
							"Title",
							"title for your place. should be short and catchy as in advertisement"
						)}
						<input
							type="text"
							value={title}
							onChange={(ev) => setTitle(ev.target.value)}
							placeholder="tilte, for example: my lovely apt"
						/>
						{preInput("Address", "address of your place")}
						<input
							type="text"
							value={address}
							onChange={(ev) => setAddress(ev.target.value)}
							placeholder="address"
						/>
						{preInput("Photos", "more=better")}
						<div className="flex gap-2">
							<input
								type="text"
								value={photoLink}
								onChange={(ev) => setPhotoLink(ev.target.value)}
								placeholder="Add Using a link....jpg"
							/>
							<button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
								Add&nbsp;photo
							</button>
						</div>
						<div className="mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-col-6">
						{addedPhotos.length > 0 && addedPhotos.map((link,index)=>(
							// eslint-disable-next-line react/jsx-key
							<div key={index}>
								{
									<img className="rounded-2xl" src={"http://localhost:3000/uploads/"+link} alt={link} />
								}
							</div>
						))}
							<button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-8 h-8"
								>
									<path
										fillRule="evenodd"
										d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
										clipRule="evenodd"
									/>
								</svg>
								Upload
							</button>
						</div>
						{preInput("Description", "Description of the place")}
						<textarea
							value={description}
							onChange={(ev) => setDescription(ev.target.value)}
						/>
						{preInput("Perks", "select all the perks of your place")}
						<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
							<Perks selected={perks} onChange={setPerks} />
						</div>
						{preInput("Extra info", "house rules, etc")}
						<textarea
							value={extraInfo}
							onChange={(ev) => setExtraInfo(ev.target.value)}
						/>
						{preInput(
							"check in&apos;out times",
							"add check in and out times, remember to have some time window for cleaning the room between guests"
						)}
						<div className="grid gap-2 sm:grid-cols-3">
							<div>
								<h3 className="mt-2 -mb-1">Check in time</h3>
								<input
									type="text"
									value={checkIn}
									onChange={(ev) => setCheckIn(ev.target.value)}
									placeholder="11:00"
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Check in time</h3>
								<input
									type="text"
									value={checkOut}
									onChange={(ev) => setCheckOut(ev.target.value)}
									placeholder="18:00"
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Max number of guests</h3>
								<input
									type="text"
									pattern="[0-9]*"
									inputMode="numeric"
									value={maxGuest}
									onChange={(ev) => setMaxGuest(ev.target.value)}
									placeholder="3"
								/>
							</div>
						</div>
						<button className="primary my-4">Save</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default PlacesPage;
