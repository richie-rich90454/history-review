import { Route, Router } from "@solidjs/router";
import type { JSX } from "solid-js";
import { ServicesProvider } from "./contexts/ServicesContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetail from "./pages/CourseDetail";
import EventsTimeline from "./pages/EventsTimeline";
import Submit from "./pages/Submit";
import Admin from "./pages/Admin";
import Approvals from "./pages/Approvals";

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
