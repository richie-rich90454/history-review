import { Route, Router } from "@solidjs/router";
import { lazy, type JSX } from "solid-js";
import { ServicesProvider } from "./contexts/ServicesContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";

// Lazy-load every page so each route ships in its own chunk.
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const EventsTimeline = lazy(() => import("./pages/EventsTimeline"));
const Submit = lazy(() => import("./pages/Submit"));
const Admin = lazy(() => import("./pages/Admin"));
const Approvals = lazy(() => import("./pages/Approvals"));

function App(): JSX.Element {
    return (
        <ServicesProvider>
            <AuthProvider>
                <Router>
                    <Route path="/" component={Layout}>
                        <Route path="/" component={Home} />
                        <Route path="login" component={Login} />
                        <Route path="register" component={Register} />
                        <Route
                            path="courses/:courseId"
                            component={CourseDetail}
                        />
                        <Route
                            path="periods/:periodId/events"
                            component={EventsTimeline}
                        />
                        <Route
                            path="submit"
                            component={() =>
                                RouteGuard.Protected({ children: <Submit /> })
                            }
                        />
                        <Route
                            path="admin"
                            component={() =>
                                RouteGuard.AdminOnly({ children: <Admin /> })
                            }
                        />
                        <Route
                            path="admin/approvals"
                            component={() =>
                                RouteGuard.AdminOnly({
                                    children: <Approvals />,
                                })
                            }
                        />
                    </Route>
                </Router>
            </AuthProvider>
        </ServicesProvider>
    );
}

export default App;
