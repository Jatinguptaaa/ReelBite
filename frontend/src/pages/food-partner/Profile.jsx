import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from "../../services/api";

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        api.get(`/api/food-partner/${id}`)
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
            .catch(error => {
                console.error('Error fetching profile:', error)
            })
    }, [ id ])

    const handleLogout = async () => {
          try {
            const res = await api.get('/api/auth/food-partner/logout')
            if (res.status === 200) {
                localStorage.clear()
                navigate('/')
            } else {
                console.warn('Logout responded with', res.status)
            }
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">Rating</span>
                        <span className="profile-stat-value">4.2 ⭐️</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">345</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v.id} className="profile-grid-item">
                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted ></video>
                    </div>
                ))}
            </section>

            <section className="logout-section">
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </section>
        </main>
    )
}

export default Profile