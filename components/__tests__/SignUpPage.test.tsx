import react from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SignUpPage from "../../app/(auth)/signuppage";
import { mockProfile } from "@/context/MockProfile";

describe("SignUpPage", () => {
	render(<SignUpPage />);

	const signUpButton = screen.getByTestId('sign-up-button');

	it("Successful sign up for shift scheduling app", () => {
		// Enter valid email and password
		fireEvent.changeText(screen.getByPlaceholderText('example@gmail.com'), 'valid email');
		fireEvent.changeText(screen.getByPlaceholderText('•••••••••••'), 'valid password');
		expect(signUpButton).toHaveProp('disabled', false);
	});
});