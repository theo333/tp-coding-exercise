import React from 'react';
import './ListItem.css';

const ListItem = ({item}) => {
	const {id, title, subreddit_name_prefixed, thumbnail,thumbnail_height, thumbnail_width, permalink} = item.data;
	const baseUrl = "https://reddit.com/"
	return (
		<li className="reddit-list-item" key={id}>
			<p><a href={baseUrl + permalink} target="_blank" rel="noreferrer">{title}</a></p>
			<div className="reddit-list-item-right">
				<img src={thumbnail} alt="" width={thumbnail_width} height={thumbnail_height}/>
				<p>
					<a href={baseUrl + subreddit_name_prefixed} target="_blank" rel="noreferrer">{subreddit_name_prefixed}</a>
				</p>
			</div>
		</li>
	);
};

export default ListItem;