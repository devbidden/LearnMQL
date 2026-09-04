const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken } = require("../config/token");
const { sendEmail } = require("../utils/email");

const createVerificationToken = () => {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");
    return { verificationToken, hashedToken };
};
   
const sendVerificationEmail = async (user, verificationToken) => {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    await sendEmail({
        to: user.email,
        subject: "Verify your LearnMQL email address",
        html: `
            <h2>Verify your email</h2>

            <p>
                Thanks for signing up for LearnMQL. Please confirm this is your email address.
            </p>

            <a
                href="${verifyUrl}"
                style="
                    display: inline-block;
                    padding: 12px 20px;
                    background: #0B5D3B;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                "
            >
                Verify Email
            </a>

            <p>
                This link expires in 24 hours.
            </p>

            <p>
                If you didn't create this account, you can safely ignore this email.
            </p>
        `,
    });
};

const registerUser = async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { verificationToken, hashedToken } = createVerificationToken();

    const newUser = await User.create({
        ...userData,
        password: hashedPassword,
        isVerified: false,
        verificationToken: hashedToken,
        verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    await sendVerificationEmail(newUser, verificationToken);

    const token = generateToken(newUser);
    return { user: newUser, token };
};
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = generateToken(user);
    return { user, token };
};
const logoutUser = async () => {
    return { success: true, message: "Logged out successfully" };
};

const verifyEmail = async (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error("Invalid or expired verification link");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    const authToken = generateToken(user);
    return { user, token: authToken };
};

const resendVerificationEmail = async (email) => {
    const user = await User.findOne({ email });

    // Don't reveal whether the email exists
    if (!user || user.isVerified) {
        return {
            success: true,
            message: "If an account with this email needs verification, a new link has been sent.",
        };
    }

    const { verificationToken, hashedToken } = createVerificationToken();
    user.verificationToken = hashedToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(user, verificationToken);

    return {
        success: true,
        message: "If an account with this email needs verification, a new link has been sent.",
    };
};

const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email });

        // Don't reveal whether the email exists
        if (!user) {
            return {
                success: true,
                message:
                    "If an account exists with this email, a reset link has been sent.",
            };
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before storing it
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        // Token expires in 15 minutes
        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create reset link
        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send reset email
        await sendEmail({
            to: user.email,
            subject: "Reset your LearnMQL password",
            html: `
                <h2>Password Reset</h2>

                <p>
                    You requested to reset your LearnMQL password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #0B5D3B;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                    "
                >
                    Reset Password
                </a>

                <p>
                    This link expires in 15 minutes.
                </p>

                <p>
                    If you didn't request this, you can safely ignore this email.
                </p>
            `,
        });

        return {
            success: true,
            message:
                "If an account exists with this email, a reset link has been sent.",
        };

    } catch (error) {
        console.error("Forgot password service error:", error);
        throw new Error("Unable to process password reset request");
    }
};


const resetPassword = async (token, newPassword) => {
    try {
        // Hash the token that came from the reset link
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid token that has not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            throw new Error("Invalid or expired reset token");
        }

        // Hash the new password using bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;

        // Remove reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return {
            success: true,
            message: "Password reset successfully",
        };

    } catch (error) {
        console.error("Reset password service error:", error);
        throw new Error(error.message);
    }
};



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
};
