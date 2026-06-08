import { useEffect, useState } from 'react';

import Modal from '../../components/Modal';
import { type ShareableUserApi, type ShareableUserListApi } from '../../utils/ApiTypes'

type ShareButtonProps = {
    recipeId: number | string;
};

type UserCheckboxProps = {
    valueHook: [Number[], React.Dispatch<React.SetStateAction<Number[]>>];
    user: ShareableUserApi;
    disabled?: boolean;
};

const UserCheckbox = ({ valueHook, user, disabled }: UserCheckboxProps) => {
    const [selectedUsers, setSelectedUsers] = valueHook;

    return (
        <div>
            <input
                type='checkbox'
                className='input input__hidden'
                disabled={disabled}
                id={'shared-users' + user.key_id.toString()}
                name='shared-users' value={user.key_id}
                onChange={(e) => {
                    if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, parseInt(e.target.value)]);
                    } else {
                        setSelectedUsers(selectedUsers.filter(item => item !== parseInt(e.target.value)));
                    }
                }}
            />
            <label htmlFor={'shared-users' + user.key_id.toString()}>{user.name}</label>
        </div>
    );
}

const ShareButton = ({ recipeId }: ShareButtonProps) => {
    const [selectedUsers, setSelectedUsers] = useState<Number[]>([]);
    const [allUsers, setAllUsers] = useState<ShareableUserListApi>({local: [], foreign: []});

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:5001/user/share", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || "Fetching users failed");
                }
                
                setAllUsers(data as ShareableUserListApi);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unexpected error";
                console.log(message);
                setError("Unable to load users");
            } finally {
                setLoading(false);
            }
        };
        const fetchShared = async () => {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:5001/recipe/" + recipeId + "/share", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || "Fetching shared users failed");
                }
                
                setSelectedUsers(data as Number[]);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unexpected error";
                console.log(message);
                setError("Unable to load shared users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
        fetchShared();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const users_parsed = {
            recipe_id: recipeId,
            key_ids: selectedUsers
        }

        try {
            const response = await fetch("http://localhost:5001/recipe/" + recipeId + "/share", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(users_parsed)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Sharing recipe failed");
            }

            setOpen(false);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
            >
                Share
            </button>
            {open && (
                <Modal
                    onCloseButtonClick={() => setOpen(false)}
                >
                    <fieldset>
                        <legend>Select users:</legend>
                        {allUsers.foreign.length > 0 ?
                            <>
                                <div>
                                    {allUsers.local.map((user) => (
                                        <UserCheckbox
                                            valueHook={[selectedUsers, setSelectedUsers]}
                                            user={user}
                                            disabled={loading}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {allUsers.local.map((user) => (
                                        <UserCheckbox
                                            valueHook={[selectedUsers, setSelectedUsers]}
                                            user={user}
                                            disabled={loading}
                                        />
                                    ))}
                                </div>
                            </>
                            :
                            allUsers.local.map((user) => (
                                <UserCheckbox
                                    valueHook={[selectedUsers, setSelectedUsers]}
                                    user={user}
                                    disabled={loading}
                                />
                            ))
                        }
                    </fieldset>
                    <button
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>
                    {error && <div>{error}</div>}
                </Modal>
            )}
        </>
    )
}

export default ShareButton