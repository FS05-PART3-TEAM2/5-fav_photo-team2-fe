interface ProfileCardProps {
  children: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ children }) => {
  return (
    <div
      className={`hidden md:block absolute w-[260px] py-[20px] right-0 bg-gray-500 rounded-[2px]}`}
    >
      {children}
    </div>
  );
};

export default ProfileCard;
