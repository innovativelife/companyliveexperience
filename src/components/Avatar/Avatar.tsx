import { useState, useEffect, useRef, useMemo } from "react";

//Data
import { Employee } from "../../features/employees/employeeTypes";
import AvatarSkeleton from "./AvatarSkeleton";

type AvatarProps = {
  employee?: Employee;
  size?: string;
  employeeLoading: boolean;
};

const Avatar = ({ employee, size = "large", employeeLoading }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // When avatarURL or employeeLoading changes, reset isImageLoaded
  useEffect(() => {
    setIsImageLoaded(false);
    setImageError(false);

    if (employee?.avatarURL && imgRef.current) {
      if (imgRef.current.complete) {
        setIsImageLoaded(true);
      }
    } else if (!employeeLoading && !employee?.avatarURL) {
      setIsImageLoaded(true);
    }
  }, [employee?.avatarURL, employeeLoading]);

  //When the image is load, updates isImageLoaded
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  //When the image fails to load, updates isImageLoaded and isImageError
  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true);
    console.log("Image failed to load");
    console.log(isImageLoaded);
  };

  // Determine if we should show the skeleton
  const shouldShowSkeleton = !isImageLoaded || !isImageLoaded;

  // Determine if we should show the initials fallback
  const shouldShowInitials =
    !employeeLoading && (!employee || !employee.avatarURL || imageError);

  const initials = useMemo(() => {
    return employee
      ? `${employee.firstName.charAt(0) ?? "U"}${
          employee.lastName.charAt(0) ?? "K"
        }`.toUpperCase()
      : "";
  }, [employee]); // Recalculate only when employee object changes

  return (
    <>
      {shouldShowSkeleton && <AvatarSkeleton size={size} />}

      {shouldShowInitials && (
        <div
          className={`
            bg-secondary text-white rounded-full flex items-center justify-center font-bold uppercase
            ${size === "small" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base"}
          `}
        >
          {initials}
        </div>
      )}

      {/* Render the img tag unconditionally but hide it with CSS when not loaded/visible */}
      {employee?.avatarURL && !imageError && (
        <img
          ref={imgRef} // Attach ref
          src={employee.avatarURL}
          alt={`${employee.firstName} ${employee.lastName}`}
          className={`
            bg-center bg-no-repeat bg-cover rounded-full
            ${size === "small" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base"}
            ${shouldShowSkeleton ? "hidden" : ""}
          `}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
    </>
  );
};

export default Avatar;
