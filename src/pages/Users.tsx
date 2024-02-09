import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiResponse, User, UserList } from "@/types";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState<UserList[]>();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response:ApiResponse<UserList[]> = await axiosPrivate.get('/api/user', {
                    signal: controller.signal
                });
                const { data } = response.data;
                isMounted && setUsers(data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err);
                  }
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            // controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.email}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
