import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import './ListContainer.css';

const ListContainer = () => {
	const [listItems, setListItems] = useState([]);
	const [afterParam, setAfterParam] = useState('');
	const [count, setCount] = useState(0)
	const [isLoading, setIsLoading] = useState(false);

	// load data on inital page load
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScrollEvent);
		return () => {
			window.removeEventListener('scroll', handleScrollEvent);
		}
	});

	const handleScrollEvent = () => {
		const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
		if (clientHeight + scrollTop >= scrollHeight - 8) {
			setIsLoading(true);
			fetchData();
		}
	};

	const getRedditList = async () => {
		try {
			let paramsStr = `?limit=25`;
			paramsStr += count ? `&count=${count}` : '';
			paramsStr += `&after=${afterParam}`;
			const resp = await axios.get(`https://api.reddit.com/r/aww/top.json${paramsStr}`);
			if (resp.status !== 200) {
				console.error('there was an error');
			} else {
				return resp.data;
			}
		} catch (err) {
			console.error(err);
		}
	};

	const fetchData = async () => {
		const list = await getRedditList();

		const items = list?.data?.children;
		const itemCount = items?.length;
		const _after = list?.data?.after;

		setListItems(prevState => [...prevState, ...items]);
		setAfterParam(_after);
		setCount(prevState => prevState + itemCount);
		setTimeout(() => setIsLoading(false), 1000);
	};

	return (
		<>
			<ul className="reddit-list">
				{listItems && listItems.map(item => {
					return <ListItem item={item} key={item?.data?.id}/>
				})}
			</ul>
			{isLoading && <p className="is-loading">Loading more items...</p>}
		</>
	);
};

export default ListContainer;