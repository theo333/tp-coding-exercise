import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import './ListContainer.css';

const ListContainer = () => {
	const [listItems, setListItems] = useState([]);
	const [after, setAfter] = useState('');
	const [count, setCount] = useState(0)
	const [isLoading, setIsLoading] = useState(false);

	// debugger;
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScrollEvent);
		return () => {
			window.removeEventListener('scroll', handleScrollEvent);
		}
	})

	const handleScrollEvent = () => {
		const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
		if (clientHeight + scrollTop >= scrollHeight) {
			console.log('load more items... | after: ', after)
			setIsLoading(true);
			fetchData();
		}
	};

	const getRedditList = async () => {
		try {
			console.log('getR count: ', count)
			let paramsStr = `?limit=5`;
			paramsStr += `&after=${after}`;
			console.log('paramsStr: ', paramsStr)
			const resp = await axios.get(`https://api.reddit.com/r/aww/top.json${paramsStr}`);
			if (resp.status !== 200) {
				console.error('there was an error');
			} else {
				console.log('getRedditList data: ', resp.data.data)
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
		console.log('itemCount: ', itemCount)
		console.log('after: ', _after)
		console.log('items: ', items)
		console.log('count: ', count)
		setListItems(prevState => {
			return [...prevState, ...items];
		});
		setAfter(_after);
		setCount(prevState => {
			console.log('count prevState: ', prevState)
			return prevState + itemCount;
		});
	}

	return (
		<div>
			<ul className="reddit-list">
				{listItems && listItems.map(item => {
					return <ListItem item={item} key={item?.data?.id}/>
				})}
			</ul>
			{isLoading && <p className="is-loading">Loading more items...</p>}
		</div>
	);
};

export default ListContainer;