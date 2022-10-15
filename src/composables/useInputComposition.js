import { v4 as uuidv4 } from "uuid";
import { computed, toRefs } from "vue";
import { useField } from "vee-validate";

export const veeValidatableProps = (props = {}, initialValue = '') => {
    return {
        initialValue: {
            type: [String, Number, Array, Object, Boolean],
            default: initialValue
        },
        label: {
            type: [String],
            default: null
        },
        modelValue: {
            type: [String, Number, Array],
            default: "",
        },
        name: {
            type: String,
            default: uuidv4(),
        },
        rules: {
            type: [String, Object],
            default: "",
        },
        placeholder: {
            type: String,
            default: () => "inputs.placeholders.generic-input"
        },
        ...props
    }
} 


export const veeValidateState = (props, options = {}) => {
    const { name } = toRefs(props);
    const { initialValue } = props
    //Vee validate set up
    const { value, errors, ...fieldMetadata } = useField(name.value, props.rules, { initialValue, label: props.label, ...options });
    const stateClass = computed(() => {
        const classA = !fieldMetadata.meta.valid && fieldMetadata.meta.dirty ? 'input-state-invalid' : 'input-state-valid'
        return classA
    })

    const isInvalid = computed(() => fieldMetadata.meta.dirty && !fieldMetadata.meta.valid)

    return {
        name, value, errors, stateClass, isInvalid, ...fieldMetadata
    }
}