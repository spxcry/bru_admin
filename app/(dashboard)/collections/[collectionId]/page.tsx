"use client"
import CollectionForm from "@/components/collections/CollectionForm"
import Loader from "@/components/custom ui/Loader"
import { useEffect, useState } from "react"

const CollectionDetails = ({ params}: { params: { collectionId: string }}) => {
    const [loading, setLoading] = useState(true)
    const [CollectionDetail, setCollectionsDetails] = useState<CollectionType | null>(null)

    const CollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
            })          
            const data = await res.json()
                setCollectionsDetails(data)
                setLoading(false)
        } catch (err) {
            console.log("[collectionId_GET]", err)

        }
    }

    useEffect(() => {
        CollectionDetails ()
    }, [])
  return loading ? <Loader /> : (
    <CollectionForm initialData={CollectionDetail}/>
  )
}

export default CollectionDetails
