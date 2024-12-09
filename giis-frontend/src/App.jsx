import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Messages from './pages/Messages/Messages';
import ReadMessages from './pages/ReadMessages/ReadMessages';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import Appointments from './pages/Appointments/Appointments';
import RegisterDoctor from './pages/RegisterDoctor/RegisterDoctor';
import RegisterDoctorTimetable from './pages/RegisterDoctorTimetable/RegisterDoctorTimetable';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<ProtectedRoute requiredUserType="GYDYTOJAS" element={<Messages />} />} />
          <Route path="/readmessages" element={<ProtectedRoute requiredUserType="PACIENTAS" element={<ReadMessages />} />} />
          <Route path="/bookappointment" element={<ProtectedRoute requiredUserType="PACIENTAS" element={<BookAppointment />} />} />
          <Route path="/appointments" element={<ProtectedRoute requiredUserType="GYDYTOJAS" element={<Appointments />} />} />
          <Route path="/registerdoctor" element={<ProtectedRoute requiredUserType="ADMINISTRATORIUS" element={<RegisterDoctor />} />} />
          <Route path="/registerdoctortimetable" element={<ProtectedRoute requiredUserType="ADMINISTRATORIUS" element={<RegisterDoctorTimetable />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
