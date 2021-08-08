import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ListContainer = () => {
	const [rList, setRList] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const getRedditList = async () => {
		try {
			const resp = await axios.get('https://api.reddit.com/r/aww/top.json');
			if (resp.status !== 200) {
				console.log('there was an error');
			} else {
				// console.log(resp.data)
				return resp.data;
			}
		} catch (err) {
			console.error(err);
		}
	};

	const fetchData = async () => {
		const list = await getRedditList();
		console.log('after: ', list.data.after)
		console.log('children: ', list.data.children)
		setRList(list.data.children);
	}

	return (
		<ul className="reddit-list">
			{rList && rList.map(item => {
				const {id, title, subreddit_name_prefixed, thumbnail, permalink} = item.data;
				const baseUrl = "https://reddit.com/"
				return (
					<li className="reddit-list-item" key={id}>
						<a href={baseUrl + permalink} alt="" target="_blank">{title}</a>
						{subreddit_name_prefixed}
						<img src={thumbnail} />
					</li>
				);
			})}
		</ul>
	);
};

export default ListContainer;