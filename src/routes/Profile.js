import { authService } from "fbase";
import { useEffect, useState } from "react";
//import Chweet from "components/Chweet";
//import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    //const history = useHistory();

    //const [chweets, setChweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    
    const onLogoutClick = () => {
        authService.signOut();
        //history.push("/");
    };

    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName : newDisplayName});
            refreshUser();  // props로 받은 refreshUser()를 호출해서 userObj 새로고침 => 리렌더링
        }
    };

    // 내 트윗만 보이기
    /*
    const getMyChweets = async () => {
        const dbChweets = await dbService
            .collection("chweets")
            .where("creatorId", "==", userObj.uid)  // 조건
            .orderBy("createdAt", "asc")            // 정렬 => 파이어스토어에서 index 작업돼야함
            .get();
        
        dbChweets.forEach((document) => {
            const chweetObject = {...document.data(), id:document.id};
            setChweets((prev) => [chweetObject, ...prev])
        });
    };

    useEffect(() => {
        getMyChweets();
    }, []);
    */

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} autoFocus className="formInput"/>
                <input type="submit" value="Update Profile" className="formBtn" style={{marginTop:10,}}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>Log Out</span>
        </div>
    );
};

export default Profile;