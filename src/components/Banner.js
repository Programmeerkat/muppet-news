export default function Banner({label, dialog}) {
    return(
        <div className="w-full h-10 bg-amber-500 flex justify-center items-center">
            <p className="font-bold">{label}: {dialog}</p>
        </div>
    )
}