// import { useNavigate } from 'react-router-dom'; 
// import toastr from 'toastr';

export const FormatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// export const useLogOut = () => {
//     const navigate = useNavigate();
    
//     const logOut = () => {
        
//         localStorage.clear();
//         toastr.error("Current Session Expired");
//         navigate("/");
//     };

//     logOut();
// }

