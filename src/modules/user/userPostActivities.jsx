import Post from "../posts/components/post/Post";

const UserPostActivities = ({ arr, msg }) => {
  return (
    <>
      {arr?.length === 0 ? (
        <div className="flex items-center justify-center">
          <p>{msg}</p>
        </div>
      ) : (
        arr
          ?.map(
            ({
              _id,
              userId,
              username,
              description,
              // location,
              createdAt,
              picsPath,
              userPicsPath,
              likes,
              comments,
              following,
              details,
            }) => (
              <div key={`${_id}-${userId}`}>
                <Post
                  postId={_id}
                  postUserId={userId}
                  username={username}
                  description={description}
                  location={location}
                  picsPath={picsPath}
                  userPicsPath={userPicsPath}
                  likes={likes}
                  comments={comments}
                  following={following}
                  timestamp={!details?.length ? createdAt : details[0].time}
                />
              </div>
            )
          )
          .reverse()
      )}
    </>
  );
};

export default UserPostActivities;
