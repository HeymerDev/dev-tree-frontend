import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/messages/ErrorMessge";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { EditProfileFormData, User } from "../../types";
import { updateUser, uploadProfileImage } from "../../api/dashboard";
import { toast } from "sonner";

const Profile = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<User>(["user"]);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data?.message);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prev: User) => {
        return {
          ...prev,
          imageUrl: data.imageUrl,
        };
      });

      toast.success(data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      handle: data?.handle || "",
      description: data?.description || "",
    },
  });

  const onSubmit = (formData: EditProfileFormData) => {
    const user = queryClient.getQueryData<User>(["user"]);
    if (!user) return;
    user.description = formData.description;
    user.handle = formData.handle;
    updateUserMutation.mutate(user);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", { required: "El handle es obligatorio" })}
        />
        {errors.handle && (
          <ErrorMessage>{errors.handle.message as string}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message as string}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};

export default Profile;
