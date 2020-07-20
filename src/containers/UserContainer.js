// @ts-nocheck
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../context/context';
import Skeleton from '../components/Skeleton';
import { isValidObject } from '../util/validators';
import { getStoryUser } from '../api/fetchApi';

function UserContainer(props = {}) {
	const { params } = props;
	const [isValidUser, setValidUser] = useState(false);
	const [existUser, setExistUser] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		async function getUser(userId = 0) {
			const user = await getStoryUser(userId);
			if (!user) {
				setValidUser(Boolean(user));
				setExistUser(Boolean(user));
				setUser(Boolean(user));
				return;
			}
			const existUser = isValidObject(user);
			setValidUser(existUser);
			setExistUser(existUser);
			setUser(user);
		}
		getUser(params.user);
	}, [params.user]);
	return (
		<ThemeConsumer>
			{({ theme }) => (
				<Fragment>
					{(!isValidUser && !existUser && !user) ||
						(isValidUser && existUser && !!user && (
							<Fragment>
								<div style={{ margin: '30px 15px' }}>
									<p style={{ color: theme.title }}>
										<span>
											<strong>${user && user.id}</strong>
											{` joined ${user && user.created}`}
										</span>
									</p>
									<p style={{ color: theme.title }}>{user && user.about}</p>
								</div>
							</Fragment>
						)) || (
							<div style={{ margin: '30px 15px' }}>
								<Skeleton
									variant="text"
									className="story"
									height="10px"
									width="45%"
								/>
								<Skeleton variant="text" className="story" />
							</div>
						)}

					{!isValidUser && !existUser && !user && (
						<h1 style={{ margin: '15px', color: theme.title }}>Invalid user</h1>
					)}
				</Fragment>
			)}
		</ThemeConsumer>
	);
}
UserContainer.propTypes = {
	props: PropTypes.object,
};

export default UserContainer;
