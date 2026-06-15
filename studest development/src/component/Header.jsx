export default function Header() {
    return (
       <header className="header">
        <div>
            <menu>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/">My Courses</a></li>
                <li><a href="/">Material</a></li>
                <li><a href="/">Messages</a></li>
                <li><a href="/">Calender</a></li>
                <li><a href="/">Settings</a></li>
            </menu>
            <input type="text" placeholder="Search..." />
                <div> <button>Search</button></div>
            
        </div>

       </header>
    )
}