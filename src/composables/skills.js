import { ref } from "vue"
import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useSkills() {
    const skills = ref([]);
    const skill = ref([]);
    const errors = ref({});
    const router = useRouter();

    // get all skills
    const getSkills = async () => {
        const response = await axios.get("skills");
        skills.value = response.data.data; // 'data' becouse {"data": []} reterned from Laravel resourse
    };

    // get single skill
    const getSkill = async (id) => {
        const response = await axios.get("skills" + id);
        skill.value = response.data.data;
    }

    // store skill
    const storeSkill = async (data) => {
        try {
            await axios.post("skills", data);
            await router.push({name: "SkillIndex"});
        } catch(error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    return {

    };
}