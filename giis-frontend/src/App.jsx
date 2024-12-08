import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Messages from './pages/Messages/Messages';
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
          <Route path="/messages" element={<ProtectedRoute requiredUserType="PACIENTAS"><Messages /></ProtectedRoute>} />
          <Route path="/bookappointment" element={<ProtectedRoute requiredUserType="PACIENTAS"><BookAppointment /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute requiredUserType="GYDYTOJAS"><Appointments /></ProtectedRoute>} />
          <Route path="/registerdoctor" element={<ProtectedRoute requiredUserType="ADMINISTRATORIUS"><RegisterDoctor /></ProtectedRoute>} />
          <Route path="/registerdoctortimetable" element={<ProtectedRoute requiredUserType="ADMINISTRATORIUS"><RegisterDoctorTimetable /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
