import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/appDemo.png";
import firebase from '../../Firebase.js'
import { useAlert } from 'react-alert'

const Container = tw.div`relative`;
//const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto self-center mx-auto`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
//const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const ImageColumn = tw.div`flex justify-center items-center`;

const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0 mx-auto`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500`


export default ({
  subheading = "Contact Us",
  heading = <>Interested?<span tw="text-primary-500"> Join our beta!</span><wbr/></>,
  description = "Be the first to know when we launch our beta.",
  submitButtonText = "Join waitlist",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [email, setEmail] = useState("Your Email Address");
  const alert = useAlert();

  function joinWaitlist() {
    if (email === "" || email === "Your Email Address") {
      alert.show('Please enter a valid email address');
      return
    }

    const db = firebase.firestore();
    const form = {
      email: email
    }

    db.collection("shoppers").add({ form }).then((docref) => {
      alert.show("You're on the waitlist! Thanks for supporting us - we'll let you know when we launch.")
    })
      .catch((error) => {
        console.error('error', error)
      })
  }


  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} style={{width: 250, height: 600}} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <div >
              <Input type="email" name="email" placeholder={email} onChange={event => setEmail(event.target.value)} /> <span>   </span>
              <button style={{ marginTop: 25, width: 200, height: 50, backgroundColor: '#7b00ff', color: 'white' }} onClick={joinWaitlist} type="submit">{submitButtonText}</button>
            </div>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
