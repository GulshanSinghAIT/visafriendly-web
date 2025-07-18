import "./App.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { FeaturedJobs } from "./components/landingPage/third/FeaturedJobs";
import { Stats } from "./components/landingPage/fourth/Stats";
import { JobCategories } from "./components/landingPage/fifth/JobCategories";
import { TestimonialsSection } from "./components/landingPage/sixth/TestimonialsSection";
import { HeroBanner } from "./components/landingPage/seventh/HeroBanner";
import { FaqSection } from "./components/landingPage/eight/FaqSection";
import { StatsSection } from "./components/landingPage/second/StatsSection";
import BlogLayout from "./components/blogPage/BlogLayout";
import { Footer } from "./components/landingPage/ninth/Footer";
// import { Footer } from "./components/landingPage/footer/Footer.jsx";
import { Blog } from "./components/blogsRead/Blog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/signup/SignupPage";
import Login from "./components/auth/login/SignupPage";
import OTP from "./components/auth/forgotPass/OTP/SignupPage";
import ForgotPassword from "./components/auth/forgotPass/forgot/SignupPage";
import NewPassword from "./components/auth/forgotPass/newPass/SignupPage";
import PasswordResetSuccess from "./components/auth/forgotPass/success/PasswordResetSuccess";
import { JobSearch } from "./components/landingPage/first/JobSearch.jsx";
import { GeneralPage } from "./components/profile/settings/general/SettingsPage.jsx";
import { NotificationPage } from "./components/profile/settings/notification/SettingsPage.jsx";
import { PasswordPage } from "./components/profile/settings/changePassword/SettingsPage.jsx";
import { DeletePage } from "./components/profile/settings/delete/SettingsPage.jsx";
import { Header } from "./components/profile/header/Header.js";
import { Page } from "./components/profile/pricing/personal/History/Page.jsx";
import { PaymentHistoryTable } from "./components/profile/pricing/personal/History/PaymentHistory.jsx";
// import { PricingPlans } from "./components/profile/pricing/UpgradePlans/PricingPlans.jsx";
import { PreferencesForm } from "./components/onboarding/preferences/PreferencesForm.jsx";
import { OnboardingForm } from "./components/onboarding/ContactDetails/OnboardingForm.jsx";
import ResumeCV from "./components/onboarding/ResumeCv/ResumeUpload.jsx";
import { SkillSet } from "./components/onboarding/Skills/SkillSet.jsx";
import PricingPlans from "./components/profile/pricing/pricingPlans/PricingPlans.jsx";
import Help from "../src/components/profile/help/Help.jsx";
import { MissionVisionComponent } from "./components/aboutUsPage/fourth/MissionVisionComponent";
import { AboutVisaFriendlyComponent } from "./components/aboutUsPage/fifth/AboutVisaFriendlyComponent";
import { StepsComponent } from "./components/aboutUsPage/sixth/StepsComponent";
import { TrustedUniversities } from "./components/landingPage/seventh/TrustedUniversities.jsx";
import { Dashboard } from "./components/applicationTrackerPage/Dashboard.js";
import { ReferAndEarn } from "./components/referAndEarn/ReferAndEarn.js";
import { SavedJobs } from "./components/savedJobsPage/savedJobs.js";
import { PopupProvider } from "react-hook-popup";
import { HandlingHrefs } from "./components/jobsAfterSignIn/handlingHrefs.js";
import { HandlingHrefsFreePlan } from "./components/jobsAfterSignInFreePlan/handlingHrefsFreePlan.js";
import React from "react";
import { PricingPage } from "./components/pricing/PricingPage.jsx";
import JobsBefore from "./components/jobsBeforeSignIn/job-listings.jsx";
import DashPage from "./components/dashboard/DashPage.jsx";
import How from "./components/landingPage/How_works/How.jsx";
import { ErrorPage } from "./components/errorPage/ErrorPage.js";
import { ErrorPage_Login } from "./components/errorPage/ErrorPage_Login.js";
import { NavBarrr } from "./components/Navbar/NavBar.jsx";
import { EducationForm } from "./components/onboarding/Education/EducationForm.jsx";
import { ExperienceForm } from "./components/onboarding/Experience/ExperienceForm.jsx";
import { LinksForm } from "./components/onboarding/Links/LinksForm.jsx";
import Profilelayout from "./components/profilepage/Profilelayout.jsx";
function App() {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <JobSearch />
                <How />
                <StatsSection />
                <FeaturedJobs />
                <Stats />
                <JobCategories />
                <TestimonialsSection />
                <TrustedUniversities />
                <HeroBanner />
                <FaqSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <>
                <div className="aboutUsBackground">
                  <NavBarrr />
                  <MissionVisionComponent />
                  <AboutVisaFriendlyComponent />
                  <StepsComponent />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/blogsRead"
            element={
              <>
                <Blog />
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <BlogLayout />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignedOut>
                  <SignUp />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <SignedOut>
                  <Login />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/otp"
            element={
              <>
                <SignedOut>
                  <OTP />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                <SignedOut>
                  <ForgotPassword />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <>
                <SignedOut>
                  <NewPassword />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <SignedIn>
                  <PasswordResetSuccess />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/profilelayout"
            element={
              <>
                <Profilelayout />
              </>
            }
          />

          <Route
            path="/settings/general"
            element={
              <>
                <SignedIn>
                  <NavBarrr />
                  <GeneralPage />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/settings/password"
            element={
              <>
                <SignedIn>
                  <NavBarrr />

                  <PasswordPage />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/settings/notifications"
            element={
              <>
                <SignedIn>
                  <NavBarrr />

                  <NotificationPage />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/settings/delete"
            element={
              <>
                <SignedIn>
                  <NavBarrr />

                  <DeletePage />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/profile/subscription"
            element={
              <>
                <SignedIn>
                  <Page />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/profile/upgradePlan"
            element={
              <>
                <SignedIn>
                  <div style={{ backgroundColor: "#F9F9F9", height: "130vh" }}>
                    <Header />
                    <PricingPlans />
                  </div>
                </SignedIn>
              </>
            }
          />

          <Route
            path="/help"
            element={
              <>
                <SignedIn>
                  <Help />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/preferences"
            element={
              <>
                <SignedIn>
                  <PreferencesForm />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/ContactDetails"
            element={
              <>
                <SignedIn>
                  <OnboardingForm />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/EducationDetails"
            element={
              <>
                <SignedIn>
                  <EducationForm />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/ResumeCV"
            element={
              <>
                <SignedIn>
                  <ResumeCV />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/SkillSet"
            element={
              <>
                <SignedIn>
                  <SkillSet />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/ExperienceDetails"
            element={
              <>
                <SignedIn>
                  <ExperienceForm />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/onboarding/LinksDetails"
            element={
              <>
                <SignedIn>
                  <LinksForm />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/jobDashboard"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <DashPage />
              </>
            }
          />
          <Route
            path="/refer"
            element={
              <>
                <ReferAndEarn />
              </>
            }
          />
          <Route
            path="/savedJobs"
            element={
              <>
                <PopupProvider>
                  <SavedJobs />
                </PopupProvider>
              </>
            }
          />
          <Route
            path="/capExemptJobsPremiumPlan"
            element={
              <>
                <PopupProvider>
                  <HandlingHrefs />
                </PopupProvider>
              </>
            }
          />
          <Route
            path="/H1BJobsPremiumPlan"
            element={
              <>
                <PopupProvider>
                  <HandlingHrefs />
                </PopupProvider>
              </>
            }
          />
          <Route
            path="/allJobsPremiumPlan"
            element={
              <>
                <SignedOut>
                  <ErrorPage_Login />
                </SignedOut>
                <SignedIn>
                  <PopupProvider>
                    <HandlingHrefs />
                  </PopupProvider>
                </SignedIn>
              </>
            }
          />
          <Route
            path="/allJobsFreePlan"
            element={
              <>
                <PopupProvider>
                  <HandlingHrefsFreePlan />
                </PopupProvider>
              </>
            }
          />
          <Route
            path="/jobsBeforeSignIn"
            element={
              <>
                <JobsBefore>
                </JobsBefore>
              </>
            }
          />
          <Route
            path="/pricing"
            element={
              <>
                <PricingPage />
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <ErrorPage />
              </>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
