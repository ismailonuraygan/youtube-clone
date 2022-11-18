import {
  Modal,
  Button,
  Group,
  Text,
  Progress,
  Stack,
  TextInput,
  Switch,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useMutation } from "react-query";
import { uploadVideo, updateVideo } from "../api";
import { Video } from "../types";
import { AxiosError, AxiosResponse } from "axios";

function EditVideo({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });
  type input = Parameters<typeof updateVideo>["0"];
  const mutation = useMutation<AxiosResponse<Video>, AxiosError, input>(
    updateVideo,
    {
      onSuccess: () => {
        setOpened(false);
      },
    }
  );
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
    >
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="My awesome video"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          required
          {...form.getInputProps("description")}
        />
        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();

    formData.append("video", files[0]);
    mutation.mutate({ formData, config });
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload Video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: "50vh", justifyContent: "center" }}
                  direction="column"
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to select </Text>
                </Group>
              );
            }}
          </Dropzone>
        )}
        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}
        {mutation.data && (
          <EditVideo videoId={mutation.data.videoId} setOpened={setOpened} />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload a video</Button>
    </>
  );
}

export default UploadVideo;