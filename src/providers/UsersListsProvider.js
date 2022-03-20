import { useState, useEffect, createContext } from "react";
// import { Db } from "../firebase-config/db";
// import { collection, getDocs } from "firebase/firestore";

const UserDataListContext = createContext();

function UsersListCompo(children) {
  // const [usersDataList, setUsersDataList] = useState([]);
  const [usersDataList, setUsersDataList] = useState("Hello, Testing New state");
  // const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

  // useEffect(() => {
  //   const getPersons = async () => {
  //     const data = await getDocs(usersCollectionRef_persons);
  //     console.log(data.docs);
  //     setUsersDataList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key:doc.id })));
  //   };
  //   getPersons();
  // }, []);

  return (
    <UserDataListContext.Provider value={usersDataList}>
        { children }
    </UserDataListContext.Provider>
  );
}

export default UsersListCompo;
export { UserDataListContext };
