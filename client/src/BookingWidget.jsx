
function BookingWidget({place}) {
	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center">
				Price: &#8360;. {place.price} /night
			</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex justify-around">
					<div className="py-3 px-4 border-r">
						<label className=" mr-2 text-left" >
							Check-In:
						</label>
						<input className="mx-2 py-2 rounded-2xl" type="date" />
					</div>
					<div className="py-3 px-4 border-l">
						<label className="mr-2 text-left" >
							Check-Out:
						</label>
						<input className="mx-2 py-2 rounded-2xl" type="date" />
					</div>
				</div>
				<div className="py-3 border-t px-4">
					<label >No. of Guest</label>
					<input
						type="text"
						pattern="[0-9]*"
						inputMode="numeric"
						placeholder="3"
						value="1"
					></input>
				</div>
			</div>
			<button className="primary mt-4">Book this Place</button>
		</div>
	);
}

export default BookingWidget;
