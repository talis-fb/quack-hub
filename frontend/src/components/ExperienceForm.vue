<script setup lang="ts">
// Zod
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// date-fns
import { cn } from '@/lib/utils'
import { formatDateInFull } from '@/utils/DateFormat'

// Components
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'

// Icons
import { Ellipsis, Plus, Pencil } from 'lucide-vue-next'

// Lifecycle Hooks

const ExperienceTypeValues = ['PROFESSIONAL', 'ACADEMIC'] as const

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Campo título obrigatório'
      })
      .min(1, { message: 'Esse campo deve ser preenchido.' }),
    about: z
      .string({
        required_error: 'Campo descrição obrigatório'
      })
      .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
    startDate: z
      .date({
        required_error: 'Campo início obrigatório'
      })
      .max(new Date(), { message: 'Data inválida.' }),
    endDate: z
      .date({
        required_error: 'Campo fim obrigatório'
      })
      .max(new Date(), { message: 'Data inválida.' }),
    type: z.enum(ExperienceTypeValues, {
      required_error: 'Campo tipo obrigatório'
    })
    // projectId: z.number()
  })
)

const { toast, dismiss } = useToast()

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const {} = values

    console.log({ values })
  } catch (error: any) {
    toast({
      title: 'Erro ao efetuar login.',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Título</FormLabel>

        <FormLabel />
        <FormControl>
          <Input type="text" placeholder="Título..." v-bind="componentField" autocomplete="title" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="about">
      <FormItem>
        <FormLabel>Descrição</FormLabel>

        <FormLabel />
        <FormControl>
          <Textarea
            placeholder="Fale um pouco sobre sua experiência"
            v-bind="componentField"
            class="resize-none"
            autocomplete="about"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="startDate">
      <FormItem class="flex flex-col">
        <FormLabel>Início</FormLabel>

        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(!value && 'text-muted-foreground')">
                <span>{{ value ? formatDateInFull(value) : 'Início' }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="endDate">
      <FormItem class="flex flex-col">
        <FormLabel>Fim</FormLabel>

        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(!value && 'text-muted-foreground')">
                <span>{{ value ? formatDateInFull(value) : 'Fim' }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Calendar v-bind="componentField" />
          </PopoverContent>
        </Popover>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Tipo</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo da experiência" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="experience in ExperienceTypeValues" :value="experience">
                {{ experience }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full">Salvar</Button>
  </form>
</template>

<style scoped></style>
