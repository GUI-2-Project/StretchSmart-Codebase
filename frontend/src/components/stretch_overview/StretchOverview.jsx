import React from 'react'
import Sidebar from './Sidebar';
import StretchCard from './StretchCard';

const [sidebarOpen, setSideBarOpen] = useState(false);
const handleViewSidebar = () => {
  setSideBarOpen(!sidebarOpen);
};


function QuestionsPage() {
    const styles = {
        stretchOverview: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            marginTop: '10px'
        },
        mainContent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            padding: '20px',
        },
    };

    return (
        <div style={styles.stretchOverview}>

            {/* Sidebar, TODO: add props */}
            <Sidebar />

            {/* Main Content */}
            <main style={styles.mainContent}>

                {/* Stretch Cards, TODO: add props */}
                <StretchCard />
                <StretchCard />
                <StretchCard />
                <StretchCard />

                {/* Start routine button*/}
            </main>

        </div>
    )
}

export default QuestionsPage
 