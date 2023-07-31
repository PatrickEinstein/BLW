import React, { useState } from "react";
import { Box, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import MyButtons from "./Button";
import TextBox from "./TextField";
import { useNavigate } from "react-router-dom";
import Picker from "../Components/Picker";
import PostCaller from "../Hooks/PostCaller";
import pizza1 from "../assets/pizza1.png";
import { setLoggedInUser, setMessage, setSnackBarOpen } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import { options, genders, Zones, Countries, Campuses } from "./PickerOptions";
import BasicDatePicker from "./DatePicker";

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
  const [date, setDate] = useState(null);
  const [course, setCourse] = useState("");


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
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  }

  const onSignUp = async () => {
console.log(paylod)

try{

  const user = PostCaller(
    {
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
    // "pizzaSignUp"
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
      justifyContent="center"
      sx={{
        backgroundColor: "transparent",
        height: 700,
        width:"100%"
        // paddingTop: 10,
        // paddingBottom: 10,
      }}
    >
      {/* <Stack
        sx={{
          height: "100%",
          width: "50%",
          p: "0 0 3rem 1.5rem",
        }}
      >
        <img
          // src={pizza1}
          alt=""
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            filter: "brightness(120%)",
          }}
        />
      </Stack> */}
      <Box
        sx={{
          height: "auto",
          width: "50%",
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "white",
              fontSize: 40,
            }}
          >
            Tell us about
            <span
              style={{
                color: "lightblue",
                fontSize: 40,
                textAlign: "right",
              }}
            >
              you
            </span>
          </Typography>
          <Stack direction="row" width="100%" spacing={3}>
            <Picker
              handleChange={handleTitle}
              options={options}
              description="Preferred Title"
              label="Title"
              selected={title}
              width="50%"
            />
            <Picker
              handleChange={handleGender}
              description="Gender"
              options={genders}
              label="Gender"
              selected={gender}
              width="50%"
            />
          </Stack>
          <Stack direction="row" width="100%" spacing={3}>
            <TextBox
              id="outlined-basic1"
              label="Church"
              variant="outlined"
              onChange={(e) => setChurch(e.target.value)}
              width="50%"
            />
            <Picker
              handleChange={handleZone}
              description="Select Your Zone"
              options={Zones}
              label="Zone"
              width="50%"
              selected={zone}
            />
          </Stack>
          <Stack direction="row" width="100%" spacing={3}>
            <TextBox
              id="outlined-basic1"
              label="City"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              width="30%"
            />
            <TextBox
              id="outlined-basic1"
              label="State"
              variant="outlined"
               onChange={(e) => setState(e.target.value)}
              width="30%"
            />
           
          </Stack>
          <Stack direction="row" width="100%" spacing={3}>
            <TextBox
              id="outlined-basic1"
              label="Course"
              variant="outlined"
              onChange={(e) => setCourse(e.target.value)}
              width="30%"
            />
           <BasicDatePicker date={date} handleDateChange={handleDateChange}/>
           
          </Stack>
          <Picker
              handleChange={handleCountry}
              description="Select Your Country"
              options={Countries}
              label="Country"
              selected={country}
              width="100%"
            />
          <Picker
            handleChange={handleCampus}
            description="Select Your Campus Ministry Zone"
            options={Campuses}
            label="Campus"
            selected={campus}
            width="100%"
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
