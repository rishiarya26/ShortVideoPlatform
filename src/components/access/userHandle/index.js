import { useState, useEffect } from 'react'
import CorrectGreen from '../../commons/svgicons/correctGreen';
import CloseRed from '../../commons/svgicons/closeRed';
import useSnackbar from '../../../hooks/use-snackbar';
import { localStorage } from '../../../utils/storage';
import CircularLoaderSmall from '../../commons/circular-loader-small';
import { useRouter } from 'next/router';
import { getItem } from '../../../utils/cookie';
import { updateUserProfile } from '../../../sources/users';

export default function UserHandle({toggleFlow}) {
    const [userHandle, setUserHandle] = useState("");
    const [correct, setCorrect] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const {showSnackbar} = useSnackbar();
    const router = useRouter();
    const device = getItem('device-type');

    const onSubmit = async(e) => {
        e.preventDefault();
        if(userHandle.length < 3){
            showSnackbar({message: "Length should be minimum 3 characters."})
            setCorrect(false);
            return;
        } else if(!userHandle.match(/^[a-zA-Z0-9._]*$/)) {
            showSnackbar({message: "User handle can only contain alphabets, numbers, underscores, and periods(.)."})
            setCorrect(false);
            return;
        }
        setLoading(true);
        try{
            let response;
            const payload = {
              id: userDetails?.id,
              profilePic: userDetails?.profilePic,
              firstName: userDetails?.firstName,
              lastName: userDetails?.lastName,
              dateOfBirth: userDetails?.dateOfBirth,
              userHandle: userHandle,
              onboarding: null,
              profileType: null,
              bio: userDetails?.bio,
              languages: userDetails?.languages
            };
            response = await updateUserProfile(payload);
            const data = localStorage?.get('user-details');
            data.userHandle = userHandle;
            localStorage.set('user-details', data);
            if(device === 'mobile') {
                router.replace({
                    pathname: "/content-language",
                    query: {ref: "signup"}
                });
            } else {
                toggleFlow("contentLanguage")
            }
        } catch(e) {
            showSnackbar({ message: 'Something went wrong. Please try again' });
            console.log("err", e);
        } finally {
            setLoading(false);
        }
    }

    const getUserName = () => {
        try {
            const data = localStorage?.get(['user-details']);
            setUserDetails({...data});
            const trimmedUserHandle = data?.userHandle?.substr(1);
            setUserHandle(trimmedUserHandle);
            setCorrect(true);
            console.log('user-details',data)
        } catch(e) {
            console.log("err", e)
        }
    }

    useEffect(() => {
        getUserName();
    }, [])

    const laterOnClick = () => {
        if(device === 'mobile') {
            router.replace({pathname: "/content-language",query: {ref: "signup"}});
        } else {
            toggleFlow("contentLanguage");
        }
    }

  return (
    <div className='p-3'>
        <div className='flex'>
            <span className='mx-auto font-semibold'>Create Username</span>
        </div>
        <form onSubmit={onSubmit}>
            <div className='pt-10 px-3'>
                    <div className='text-gray-400 text-xs'>You can always change this later</div>
                    <div className="mt-4">
                        <div className='w-full border-b-2 border-grey-300 px-4 py-2 flex'>
                            <input
                            id="userHandle"
                            value={userHandle}
                            onChange={(e) => {
                                const text = e?.target?.value;
                                setUserHandle(text);
                                if(text.length === 0) {
                                    setCorrect(null);
                                } else if(text.length >=3 && text.match(/^[a-zA-Z0-9._]*$/)) {
                                    setCorrect(true);
                                } else if(text.length < 3 || !text.match(/^[a-zA-Z0-9._]*$/)) {
                                    setCorrect(false);
                                }
                            }}
                            type="text"
                            name="user Handle"
                            placeholder="User Handle"
                            className="w-full"
                            required
                            autoComplete="off"
                            maxLength={30}
                            />
                            {correct === null ? null : correct ? <CorrectGreen /> : <CloseRed />}
                        </div>
                </div>
                <div className='text-gray-400 mt-5 text-sm'>
                    <ol>
                        <li>1. Username can contain only alphabets, numbers, underscores, and periods(.).</li>
                        <li className='my-2'>2. Username should have atleast 3 characters</li>
                        <li>3. Username can&apos;t have more than 30 characters</li>
                    </ol>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className={'bg-hipired flex items-center justify-center w-full py-3 text-white font-semibold mt-5 rounded-md'}
                >
                    Submit
                    {loading ? <CircularLoaderSmall /> : ""}
                </button>
                <div className="flex w-full justify-center pt-4">
                    <div onClick={laterOnClick} className="text-gray-400 cursor-pointer">I&apos;ll do it later</div>
                </div>
            </div>
        </form>
    </div>
  )
}
