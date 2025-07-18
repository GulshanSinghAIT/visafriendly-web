import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LinksForm.module.css";
import { LinksInput } from "./LinksInput";
import { useUser } from "@clerk/clerk-react"

export function LinksForm() {
    const { user } = useUser();
    const useremail = user?.emailAddresses[0]?.emailAddress;
    const [formData, setFormData] = useState({
        linkedin: "",
        github: "",
        portfolio: "",
        other: "",
    });
    const [linksId, setLinksId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            if (!useremail) return;
            setFetching(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/onboarding/links/${useremail}`);
                if (res.data && res.data.data) {
                    setFormData({
                        linkedin: res.data.data.linkedin || "",
                        github: res.data.data.github || "",
                        portfolio: res.data.data.portfolio || "",
                        other: res.data.data.other || "",
                    });
                    setLinksId(res.data.data.id);
                }
            } catch (err) {
                // If 404, user has no links yet, so do nothing
            } finally {
                setFetching(false);
            }
        };
        fetchLinks();
    }, [useremail]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const email = useremail;
            if (!email) {
                setError("User email not found. Please log in again.");
                setLoading(false);
                return;
            }
            const payload = { ...formData, email };
            if (linksId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/onboarding/links/${linksId}`, payload);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/onboarding/links`, payload);
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className={styles.container}><div className={styles.content}>Loading...</div></div>;
    }

    return (
                <form onSubmit={handleSubmit} className={styles.onboardingForm}>
                    <div className={styles.formGrid}>
                        <div >
                            <LinksInput
                                label="LinkedIn"
                                id="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://www.linkedin.com/"
                                required={false}
                            />
                        </div>
                        <div >
                            <LinksInput
                                label="GitHub"
                                id="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/"
                                required={false}
                            />
                        </div>
                        <div >
                            <LinksInput
                                label="Portfolio"
                                id="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://www.portfolio.com/"
                                required={false}
                            />
                        </div>
                        <div >
                            <LinksInput
                                label="Other"
                                id="other"
                                value={formData.other}
                                onChange={handleChange}
                                placeholder="https://"
                                required={false}
                            />
                        </div>
                    </div>
                    {error && <div className={styles.error}>{error}</div>}

                    <hr className={styles.dividerLast} />
                    <button type="Submit" className={styles.submitButton} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
    );
} 
