import Link from "next/link";

const LogoHeader = () => {
    return (
        <div className="border-b border-slate-300 text-xl font-bold flex hover:bg-purple-50">
            <Link href="/" prefetch={false}>
                <a className="w-full h-full pl-2 py-2">Dan Caldwell</a>
            </Link>
        </div>
    )
}

export default LogoHeader;