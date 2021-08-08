import React from 'react';

const ListItem = ({item}) => {
	const {id, title, subreddit_name_prefixed, thumbnail, permalink} = item.data;
	const baseUrl = "https://reddit.com/"
	return (
		<li className="reddit-list-item" key={id}>
			<a href={baseUrl + permalink} alt="" target="_blank" rel="noreferrer">{title}</a>
			{subreddit_name_prefixed}
			<img src={thumbnail} />
		</li>
	);
};

export default ListItem;