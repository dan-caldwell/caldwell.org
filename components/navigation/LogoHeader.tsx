import Link from "next/link";

const LogoHeader = () => {
    return (
        <div>
            <Link href="/" prefetch={false}>
                <a>Dan Caldwell</a>
            </Link>
        </div>
    )
}

export default LogoHeader;