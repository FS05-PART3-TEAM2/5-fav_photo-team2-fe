import React from "react";

interface ProfileDrawerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ onClose, children }) => {
  return (
    <div
      className="md:hidden fixed top-0 left-0 h-full w-full bg-[#0f0f0f]/75 shadow-lg z-50 transition-transform duration-300"
      onClick={onClose}
    >
      <div
        className="top-0 left-0 h-full w-[260px] bg-gray-500 shadow-lg transition-transform duration-300 flex flex-col justify-between py-[40px]"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ProfileDrawer;
