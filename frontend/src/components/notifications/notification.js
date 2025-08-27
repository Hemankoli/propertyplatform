import toast from "react-hot-toast";

export const IncorrectPasswordNotification = () => {toast.error('Incorrect Password')};
export const LoginSuccessfulNotification = () => {toast.success("Login Successful")};
export const UserAlreadyRegisteredNotification = () => {toast.error("User Already Registered")};
export const ServerErrorNotification = () => {toast.error("Server Error. Please try again later.")};
export const UserNotFoundNotification = () => {toast.error('User Not Found')};

export const RegistrationSuccessfulNotification = () => {toast.success("Registered Successfully")};
export const AllFieldsRequiredNotification = () => {toast.error("Please enter all required fields")};
export const PasswordsDoNotMatchNotification = () => {toast.error("Password and Confirm Password do not match")};
export const PasswordTooShortNotification = () => {toast.error("Password must be at least 6 characters");};


export const PropertyUpdatedSuccessfullyNotification = () => {toast.success("Property Updated Successfully!")};
export const PropertyCreatedSuccessfullyNotification = () => {toast.success("Property Created Successfully!")};
export const PropertyDeletedSuccessfullyNotification = () => {toast.success("Property Deleted Successfully!")};
export const SomethingWentWrongNotification = () => {toast.error("Something went wrong!")};

export const BookingDatesRequiredNotification = () => {toast.error("Please select start and end dates for booking.")};
export const PaymentSuccessfulNotification = () => {toast.success("🎉 Payment Successful & Booking Confirmed!")};
export const PaymentFailedNotification = () => {toast.error("Payment Failed!")};
