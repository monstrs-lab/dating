import type { ReactElement } from 'react'

import * as FileSystem       from 'expo-file-system'
import * as ImagePicker      from 'expo-image-picker'
import { Pressable }         from 'react-native'
import { Image }             from 'react-native'
import { useRouter }         from 'expo-router'
import { useState }          from 'react'
import { useCallback }       from 'react'
import React                 from 'react'

import { Button }            from '../../ui/button'
import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
import { useProfile }        from '../../shared'
import operations            from '../../operations'

export const FillPhotoScreen = (): ReactElement => {
  const router = useRouter()
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const { setProfile } = useProfile()

  const onSelectImage = useCallback(async () => {
    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!canceled) {
      // eslint-disable-next-line
      setImage(assets.at(0)!)
    }
  }, [setImage])

  const onUploadImage = useCallback(async () => {
    setInProgress(true)

    if (image) {
      try {
        const size = image.fileSize || ((await FileSystem.getInfoAsync(image.uri)) as any).size

        const { createUpload } = await operations.createUpload({
          bucket: 'photos',
          name: image.fileName || image.uri.split('/').reverse().at(0)!,
          size,
        })

        await FileSystem.uploadAsync(createUpload.result!.url, image.uri, {
          httpMethod: 'PUT',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          fieldName: image.fileName || image.uri.split('/').reverse().at(0),
          mimeType: [image.type, image.uri.split('.').reverse().at(0)].join('/'),
        })

        const { confirmUpload } = await operations.confirmUpload({
          id: createUpload.result!.id,
        })

        const { addProfilePhoto } = await operations.addProfilePhoto({
          photoId: confirmUpload.result!.id,
        })

        setProfile(addProfilePhoto.result!)

        router.navigate('/(main)')
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      } finally {
        setInProgress(false)
      }
    }
  }, [image, router, setInProgress, setProfile])

  return (
    <Box p='3x' flex={1}>
      <Box mb='4x' alignItems='center'>
        <Text fontSize={20}>Выберите фото</Text>
      </Box>
      <Box style={{ flexGrow: 1 }}>
        <Pressable
          onPress={() => {
            onSelectImage()
          }}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={{ width: '100%', height: '80%' }} />
          ) : (
            <Box style={{ backgroundColor: 'gray', width: '100%', height: '80%', padding: 24 }} />
          )}
        </Pressable>
      </Box>
      <Box style={{ flexBasis: 50 }}>
        <Button
          disabled={inProgress || !image}
          onPress={() => {
            onUploadImage()
          }}
        >
          Загрузить
        </Button>
      </Box>
    </Box>
  )
}
