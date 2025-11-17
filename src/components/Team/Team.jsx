

const Team = ({img, name, head, about}) => {
  return (
    <div>
       <div className="bg-gray-300 rounded-lg shadow-lg p-6 text-center hover:scale-95 transition-all duration-500">
              <img
                src={img}
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800 mb-2">{name}</h4>
              <p className="text-gray-600 mb-4">{head}</p>
              <p className="text-gray-600">
                {about}
              </p>
            </div>
    </div>
  )
}

export default Team
