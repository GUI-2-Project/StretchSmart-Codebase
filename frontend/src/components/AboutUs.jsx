import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { WindupChildren, Pace } from "windups";

const About = () => {
    // State to manage the flipped state of cards
    const [isFlipped, setIsFlipped] = useState(new Array(5).fill(false));

    // Function to handle hover action over the cards
    const handleHover = (index) => {
        // Toggle the flipped state for the card at the given index
        const updatedFlipped = [...isFlipped];
        updatedFlipped[index] = !updatedFlipped[index];
        setIsFlipped(updatedFlipped);
    };

    const teamMembers = [
        { emoji: '🪫', name: 'Ed Alderman', co: 'CO 2025', role: 'Frontend, Backend, System Analysis, Quality Assurance' },
        { emoji: '️🐈', name: 'Sean Diaz', co: 'CO 2024', role: 'Frontend, Backend, Quality Assurance' },
        { emoji: '😼', name: 'Nabil Barkallah', co: 'CO 2025', role: 'Project Manager, Frontend, Researcher' },
        { emoji: '😪', name: 'Patricia Antilitz', co: 'CO 2025', role: 'Frontend, Backend, Quality Assurance' },
        { emoji: '🤷‍♂', name: 'Kalin Toussaint', co: 'CO 2024', role: 'Project Manager, Frontend, Backend, Quality Assurance' },
    ];

    // Determine the grid layout based on the number of team members
    const gridTemplateColumns = teamMembers.length % 2 === 0 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)';

    const cardStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderTop: '4px solid #ccc',
        borderBottom: '4px solid #ccc',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '150px',
    };

    const emojiStyle = {
        fontSize: '5rem'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', paddingBottom: '100px' }}>
            <WindupChildren>
                <Pace ms={100}>
                    <h1 style={{ fontSize: '5rem', margin: '1rem' }}>About Us</h1>
                </Pace>
            </WindupChildren>
            {/* Grid layout for team members */}
            <div style={{
                display: 'grid',
                gridTemplateColumns,
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Mapping over team members to create flip cards */}
                {teamMembers.map((member, index) => (
                    <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal" key={index}>
                        {/* Front side of the card */}
                        <div
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(index)}
                            style={cardStyle}
                        >
                            <span style={emojiStyle}>{member.emoji}</span>
                        </div>
                        {/* Back side of the card */}
                        <div
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(index)}
                            style={{ ...cardStyle, fontSize: '1.5rem', flexDirection: 'column' }}
                        >
                            <div>{member.name}</div>
                            <div>{member.co}</div>
                            <div>{member.role}</div>
                        </div>
                    </ReactCardFlip>
                ))}
                {/* Filler div to maintain grid structure when there is an odd number of team members */}
                {teamMembers.length % 2 !== 0 && <div></div>}
            </div>
        </div>
    );
};

export default About;
