import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo & Navigation */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logos/logo.png" alt="AnyComp" width={40} height={40} />
          </Link>
          <nav className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
            <Link href="#">Manage company <span>▾</span></Link>
            <Link href="#">Company Secretary <span>▾</span></Link>
            <Link href="#">Incorporate Company <span>▾</span></Link>
            <Link href="#">Sign Documents <span>▾</span></Link>
          </nav>
        </div>
        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <MenuIcon className="text-gray-600 cursor-pointer lg:hidden" />
          <NotificationsIcon className="text-gray-600 cursor-pointer" />
          <SettingsIcon className="text-gray-600 cursor-pointer" />
          <Image src="/avatar.jpg" alt="User Avatar" width={32} height={32} className="rounded-full" />
        </div>
      </div>
      <hr className="border-gray-200"/>
    </header>
);
}
