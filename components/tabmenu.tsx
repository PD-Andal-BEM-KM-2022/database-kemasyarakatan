import { Tabs } from "flowbite-react";
import Card from "./card";
import { useState, useEffect } from "react";

export default function Tabmenu() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("/api/post/get-posts")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			});
	}, []);

	console.log(posts);

	return (
		<div className="mx-auto w-[90%]">
			<Tabs.Group aria-label="Tabs with underline" style="underline">
				<Tabs.Item active={true} title="Semua">
					<div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/Zyx1bK9mqmA"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/DNkoNXQti3c"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/0aMMMUjiiEQ"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/KdeqA3aTnBY"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/t0BavJY0M-U"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/1qfy-jDc_jo"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/bEcC0nyIp2g"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/TdpSX7XAcKo"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/Cecb0_8Hx-o"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/-uHVRvDr7pg"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Kemanusiaan">
					<div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Keadilan">
					<div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card
							Image="https://source.unsplash.com/Zyx1bK9mqmA"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/DNkoNXQti3c"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Persatuan">
					<div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card
							Image="https://source.unsplash.com/0aMMMUjiiEQ"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/KdeqA3aTnBY"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/t0BavJY0M-U"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
					</div>
				</Tabs.Item>
				<Tabs.Item title="Musyawarah">
					<div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card
							Image="https://source.unsplash.com/1qfy-jDc_jo"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/bEcC0nyIp2g"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/TdpSX7XAcKo"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/Cecb0_8Hx-o"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
						<Card
							Image="https://source.unsplash.com/-uHVRvDr7pg"
							Title="Makan-makan Komunitas"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
						/>
					</div>
				</Tabs.Item>
			</Tabs.Group>
		</div>
	);
}
