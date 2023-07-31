import React, { useState } from "react";
import { Box, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import MyButtons from "./Button";
import TextBox from "./TextField";
import { useNavigate } from "react-router-dom";
import Picker from "../Components/Picker";
import PostCaller from "../Hooks/PostCaller";
import dayjs from 'dayjs';
import { setLoggedInUser, setMessage, setSnackBarOpen } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import { options, genders, Zones, Countries, Campuses, Courses } from "./PickerOptions";
import BasicDatePicker from "./DatePicker";
import Logo from "../assets/blw.png"

const SignUp = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState("");
  const [title, setTitle] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [church, setChurch] = React.useState("");
  const [city, setCity] = React.useState("")
  const [zone, setZone] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [campus, setCampus] = React.useState("")
  const [state, setState] = React.useState("")
  const [course, setCourse] = useState("");
  const [date, setDate] = React.useState(dayjs('2022-04-17'));

  const handleCourse = (event) => {
    setCourse(event.target.value);
  };
   const handleDateChange = (newDate) => {
     setDate(newDate);
   };
  const handleZone = (event) => {
    setZone(event.target.value);
  };
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleCampus = (event) => {
    setCampus(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const paylod={
    title: title,
    gender: gender,
    church: church,
    city: city,
    zone: zone,
    state: state,
    country: country,
    campus:campus,
    fullname: `${firstName} ${lastName}`,
    email: email,
    phone: phone,
    date:date,
      course:course,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  }

  const onSignUp = async () => {
console.log(paylod)

try{

  const user = PostCaller(
    {
      date:date,
      course:course,
      title: title,
      gender: gender,
      church: church,
      city: city,
      zone: zone,
      state: state,
      fullname: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    },
    "signup"
  );
  const awaitedUser = await user;
  console.log(awaitedUser);
  dispatch(setSnackBarOpen(true));
  dispatch(setMessage(awaitedUser.message));
  if (awaitedUser.status === "200") {
    navigate("/signin");
}
}catch(err){
alert(err.message);
}  
 };
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "transparent",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundImage: `
        linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
        url(${Logo})
      `,
        width:"100%"
      
      }}
    >
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "white",
              fontSize: 40,
            }}
          >
            Tell us about  <span
              style={{
                color: "lightblue",
                fontSize: 40,
                textAlign: "right",
              }}
            >
              you
            </span>
           
          </Typography>
        
            <Picker
              handleChange={handleTitle}
              options={options}
              description="Preferred Title"
              label="Title"
              selected={title}
              width="80%"
            />
            <Picker
              handleChange={handleGender}
              description="Gender"
              options={genders}
              label="Gender"
              selected={gender}
              width="80%"
            />
          
         
            <TextBox
              id="outlined-basic1"
              label="Church"
              variant="outlined"
              onChange={(e) => setChurch(e.target.value)}
              width="100%"
            />
            <Picker
              handleChange={handleZone}
              description="Select Your Zone"
              options={Zones}
              label="Zone"
              width="80%"
              selected={zone}
            />
         
      
            <TextBox
              id="outlined-basic1"
              label="City"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              width="100%"
            />
            <TextBox
              id="outlined-basic1"
              label="State"
              variant="outlined"
               onChange={(e) => setState(e.target.value)}
              width="100%"
            />
           
         
          
            <TextBox
              id="outlined-basic1"
              label="Course"
              variant="outlined"
              onChange={(e) => setCourse(e.target.value)}
              width="100%"
            />
           <BasicDatePicker value={date} setValue={setDate}/>
           <Picker
              handleChange={handleCourse}
              description="Select Your Career"
              options={Courses}
              label="Career"
              selected={course}
              width="80%"
            />
          
          <Picker
              handleChange={handleCountry}
              description="Select Your Country"
              options={Countries}
              label="Country"
              selected={country}
              width="80%"
            />
          <Picker
            handleChange={handleCampus}
            description="Select Your Campus Ministry Zone"
            options={Campuses}
            label="Campus"
            selected={campus}
            width="80%"
          />
          <TextBox
            id="outlined-basic1"
            label="First Name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            width="100%"
          />
          <TextBox
            id="outlined-basic1"
            label="last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextBox
            id="outlined-basic1"
            label="username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextBox
            id="outlined-basic3"
            label="Email Address"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextBox
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextBox
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextBox
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <MyButtons
            text="Sign Up"
            color="black"
            width="80%"
            height={60}
            onClick={onSignUp}
          />

          <Typography
            sx={{
              color: "white",
            }}
          >
            Already have an account ?{" "}
            <span
              style={{
                color: "lightblue",
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;
